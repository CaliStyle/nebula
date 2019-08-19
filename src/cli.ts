import { CLI } from '@orbital/core';
import { CleanCommand } from './commands/clean.command';
import { CheckCommand } from './commands/check.command';
// import { TestCommand } from './commands/test.command';
// import { HelloCommand } from './commands/hello.command';

@CLI({
    name: 'nb',
    version: '1.0.0',
    prettyName: 'Nebula CLI',
    declarations: [
        CleanCommand,
        CheckCommand
    ],
})
export class MyCLI { }