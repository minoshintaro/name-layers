import { LayerName, COLLECTION_NAME, DEFAULT_NAME, NAMING_CONVENTION } from "./settings";
import { collectNaming } from "./features/collectNaming";
import { collectNodesInSelection } from "./features/collectNodesInSelection";
import { generateName } from "./features/generateName";
import { getDataInVariableCollection } from "./features/getDataInVariableCollection";
import { matchWithReservedNames } from "./features/matchWithReservedNames";
import { setLocalVars } from "./features/setLocalVars";

figma.skipInvisibleInstanceChildren = true;

figma.on('run', async ({ command }: RunEvent) => {
  const overriddenNaming: LayerName | null = await getDataInVariableCollection(COLLECTION_NAME);
  const currentNaming: LayerName = overriddenNaming || NAMING_CONVENTION;
  const reservedNames: Set<string> = collectNaming([overriddenNaming, NAMING_CONVENTION, DEFAULT_NAME]);

  const targetNodes = collectNodesInSelection(['FRAME', 'RECTANGLE']);

  if (command === 'OVERRIDE_NAMING') {
    if (!overriddenNaming) setLocalVars();
    figma.closePlugin(overriddenNaming ? 'Already overridden with local variables' : 'Created local variables');
    return;
  }

  for (const node of targetNodes) {
    if (node.type !== 'FRAME' && node.type !== 'RECTANGLE') continue;

    const defaultName = DEFAULT_NAME[node.type.toLowerCase()];
    const canRename = matchWithReservedNames(node.name, reservedNames);

    if (command === 'SET_NAMES' && canRename) {
      node.name = generateName(node, currentNaming) || defaultName;
    } else if (command === 'RESET_NAMES' && canRename) {
      node.name = defaultName;
    } else if (command === 'RESET_ALL') {
      node.name = defaultName;
    }
  }

  figma.closePlugin(targetNodes.length > 0 ? 'Renamed' : 'No frames in your selection');
});
