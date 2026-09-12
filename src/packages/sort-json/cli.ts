#!/usr/bin/env node

/* eslint-disable no-console, no-debugger */

import { readFileSync, writeFileSync } from 'node:fs';
import { stdin } from 'node:process';

import { program } from 'commander';
import { glob } from 'glob';

import {
  type PrimitivePosition,
  type SortOptions,
  sortJson,
} from './sort-json';

/* // NOTE: Use for cli test:
 * pnpm tsx src/packages/sort-json/cli.ts -c -i src/packages/sort-json/test.json
 */

program
  .name('json-sort')
  .description('Sort JSON objects with configurable options')
  .version('1.0.0')
  .option(
    '-i, --input <pattern>',
    'Input JSON file or glob pattern (uses stdin if not specified)',
  )
  .option('-o, --output <file>', 'Output file (uses stdout if not specified)')
  .option('--in-place', 'Modify input file in-place', false)
  .option(
    '-p, --primitive <position>',
    'Primitive position: first or last',
    'first',
  )
  .option('-s, --sort <order>', 'Sort order: asc or desc', 'asc')
  .option('-c, --case-sensitive', 'Case-sensitive sorting', false)
  .option('-n, --numeric-sort', 'Numeric key sorting', false)
  .option('--indent <spaces>', 'Number of spaces for indentation', '2')
  .option('--no-color', 'Disable colored output', false)
  .parse(process.argv);

interface CliOptions {
  input?: string;
  output?: string;
  inPlace: boolean;
  primitive: PrimitivePosition;
  sort: 'asc' | 'desc';
  caseSensitive: boolean;
  numericSort: boolean;
  indent: string;
  color: boolean;
}

async function run() {
  const options = program.opts() as CliOptions;

  // Validate primitive position
  if (options.primitive !== 'first' && options.primitive !== 'last') {
    process.exit(1);
  }

  // Validate sort order
  if (options.sort !== 'asc' && options.sort !== 'desc') {
    process.exit(1);
  }

  // Validate in-place option
  if (options.inPlace && !options.input) {
    process.exit(1);
  }

  if (options.inPlace && options.output) {
    process.exit(1);
  }

  try {
    if (options.input) {
      // Find files using glob pattern
      const files = await glob(options.input, { nodir: true });

      if (files.length === 0) {
        process.exit(1);
      }

      // Sort options
      const sortOptions: SortOptions = {
        order: options.sort,
        primitivePosition: options.primitive,
        caseSensitive: options.caseSensitive,
        numericSort: options.numericSort,
      };

      const indent = parseInt(options.indent, 10) || 2;
      let processedCount = 0;

      // Process each file
      for (const file of files) {
        try {
          const inputData = readFileSync(file, 'utf-8');
          const jsonData = JSON.parse(inputData);
          const sortedData = sortJson(jsonData, sortOptions);
          const output = JSON.stringify(sortedData, null, indent);

          if (options.inPlace) {
            writeFileSync(file, output, 'utf-8');
            if (options.color) {
            } else {
            }
          } else if (options.output) {
            // For multiple files with single output, only process the first one
            if (processedCount === 0) {
              writeFileSync(options.output, output, 'utf-8');
              if (options.color) {
              } else {
              }
            }
          } else {
            // Output to stdout - only for single file or first file
            if (files.length === 1 || processedCount === 0) {
            }
          }
          processedCount++;
        } catch (_fileError) {}
      }

      if (options.inPlace && options.color) {
      }
    } else {
      // Read from stdin
      const inputData = await new Promise<string>((resolve) => {
        let data = '';
        stdin.setEncoding('utf8');
        stdin.on('readable', () => {
          let chunk: string | null;
          // biome-ignore lint/suspicious/noAssignInExpressions: Assign and compare
          while ((chunk = stdin.read()) !== null) {
            data += chunk;
          }
        });
        stdin.on('end', () => resolve(data));
      });

      const jsonData = JSON.parse(inputData);
      const sortOptions: SortOptions = {
        order: options.sort,
        primitivePosition: options.primitive,
        caseSensitive: options.caseSensitive,
        numericSort: options.numericSort,
      };
      const sortedData = sortJson(jsonData, sortOptions);
      const indent = parseInt(options.indent, 10) || 2;
      const output = JSON.stringify(sortedData, null, indent);

      if (options.output) {
        writeFileSync(options.output, output, 'utf-8');
        if (options.color) {
        } else {
        }
      } else {
      }
    }
  } catch (_error) {
    // biome-ignore lint/suspicious/noDebugger: DEBUG
    debugger;
    process.exit(1);
  }
}

if (require.main === module) {
  run();
}
