import { Command, Executable, Param, Option } from "@orbital/core";

import { check_fdescribe } from "../actions/check-fdescribe";
import { check_test_suite_config } from "../actions/check-test-suite-config";

const chalk = require('chalk')


@Command({
    name: 'check',
    description: 'Check a directory of the code in accordance with the CaliStyle Code Quality Guidlines'
})
export class CheckCommand extends Executable {
    @Option() all: boolean;

    @Option({
      description: 'Find fdescribes leftover.',
      aliases: ['fd']
    }) fdescribe: boolean;

    @Option({
      description: 'Check test suite configs.',
      aliases: ['tc']
    }) testConfig: boolean;

    execute(
        @Param() path: string = process.cwd()
    ) {
        if (this.fdescribe || this.all) {
          check_fdescribe(path)
          console.log("\n")
        }
        if (this.testConfig || this.all) {
          check_test_suite_config(path)
        }
        if (this.testConfig || this.all) {
          check_test_suite_config(path)
        }
    }
}