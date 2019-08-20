#!/usr/bin/env node
import { OrbitalFactory } from '@orbital/core';
import { Nebula } from './cli';

OrbitalFactory
    .bootstrap(Nebula)
    .execute(process.argv)