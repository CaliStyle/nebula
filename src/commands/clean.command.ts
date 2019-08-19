import { Command, Executable, Param, Option } from "@orbital/core";
import { fromDir, getConfig } from "../util";

import { clean_inputs } from "../actions/clean-inputs"

@Command({
    name: 'clean',
    description: 'Clean a portion of the code in accordance with the'
})
export class CleanCommand extends Executable {
    @Option() all: boolean;

    execute(
        @Param() path: string = process.cwd()
    ) {
      clean_inputs(path)
    }
}