#!/usr/bin/perl
use strict;
use warnings;
use Socket;
use POSIX ":sys_wait_h";

my $port = 3456;
my $root = "/Users/carlos/Documents/Apps/Math_app";

my %mime = (
    html => 'text/html; charset=utf-8',
    css  => 'text/css',
    js   => 'application/javascript',
    png  => 'image/png',
    jpg  => 'image/jpeg',
    ico  => 'image/x-icon',
);

socket(my $server, PF_INET, SOCK_STREAM, getprotobyname('tcp')) or die;
setsockopt($server, SOL_SOCKET, SO_REUSEADDR, 1);
bind($server, sockaddr_in($port, INADDR_ANY)) or die "bind: $!";
listen($server, SOMAXCONN) or die;

while (1) {
    my $client_addr = accept(my $client, $server) or next;
    my $req = '';
    while (my $line = <$client>) {
        $req .= $line;
        last if $line =~ /^\r?\n$/;
    }
    my ($method, $path) = $req =~ /^(\w+)\s+(\S+)/;
    $path = '/index.html' if !$path || $path eq '/';
    $path =~ s/\?.*//;
    my $file = $root . $path;
    my ($ext) = $file =~ /\.(\w+)$/;
    my $ct = $mime{lc($ext) // ''} // 'text/plain';
    if (-f $file) {
        open my $fh, '<', $file or do { print $client "HTTP/1.1 500 Error\r\n\r\n"; close $client; next; };
        local $/; my $body = <$fh>; close $fh;
        print $client "HTTP/1.1 200 OK\r\nContent-Type: $ct\r\nContent-Length: " . length($body) . "\r\nConnection: close\r\n\r\n$body";
    } else {
        print $client "HTTP/1.1 404 Not Found\r\nContent-Type: text/plain\r\n\r\nNot found: $path";
    }
    close $client;
}
