import type { GeneratorCallback, Tree } from '@nrwl/devkit';
import { formatFiles } from '@nrwl/devkit';
import { checkProjectTestTarget } from './lib/check-test-target';
import { generateKarmaProjectFiles } from './lib/generate-karma-project-files';
import { updateTsConfigs } from './lib/update-tsconfig';
import { updateWorkspaceConfig } from './lib/update-workspace-config';
import type { KarmaProjectOptions } from './schema';
import { karmaGenerator } from '../karma/karma';

export async function karmaProjectGenerator(
  tree: Tree,
  options: KarmaProjectOptions
): Promise<GeneratorCallback> {
  const installTask = await karmaGenerator(tree, options);
  checkProjectTestTarget(tree, options.project);
  generateKarmaProjectFiles(tree, options.project);
  updateTsConfigs(tree, options.project);
  updateWorkspaceConfig(tree, options.project);

  if (!options.skipFormat) {
    await formatFiles(tree);
  }

  return installTask;
}

export default karmaProjectGenerator;
