#!/usr/bin/env node
const { spawn } = require('child_process');

const port = process.env.PORT || '3000';
const hostname = '0.0.0.0';

console.log(`🚀 Frontend starting on ${hostname}:${port}`);
console.log(`📦 Environment: ${process.env.NODE_ENV || 'production'}`);
console.log(`🔗 API URL: ${process.env.NEXT_PUBLIC_API_URL || 'not set'}`);

// Set environment variables for the standalone server
process.env.PORT = port;
process.env.HOSTNAME = hostname;

// Run the standalone server
require('./.next/standalone/server.js');
