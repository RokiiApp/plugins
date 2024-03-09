import { AppItem, ExtensionModule, ScriptItem } from '@rokii/api';
import { Engine } from './types';
import icons from './icons';
import settings from './settings';
import { EngineSearchApp, EngineSearchAppName } from './EngineSearchApp';

const run: ExtensionModule['run'] = async ({ term, actions, settings, display }) => {
  if (!navigator.onLine) return;

  // handle custom search engine
  if (settings['Search Link']) {
    const item = new ScriptItem({
      title: `Search ${term}`,
      run: () => actions.open(settings['Search Link'] + term)
    });
    return display([item]);
  }

  // handle built-in search engines
  const engine = settings['Search Engine'] as Engine;
  const engineIcon = icons[engine];

  const engineLauncherItem = new AppItem({
    appName: EngineSearchAppName,
    title: `Search ${term} with ${engine}`,
    icon: engineIcon
  });

  return display([engineLauncherItem]);
};

const SerachExtension: ExtensionModule = {
  name: 'Search',
  run,
  apps: {
    [EngineSearchAppName]: EngineSearchApp
  },
  icon: icons.Google,
  settings
};

export default SerachExtension;
