import { NamingConvention, COLLECTION_NAME, DEFAULT_NAME } from "./settings";
import { collectNodeSetInSelection } from "./features/collectNodesInSelection";
import { figmaVariables } from "./features/figmaVariables";
import { findMissingNamings } from "./features/findMissingNamings";
import { generateName } from "./features/generateName";
import { matchNamingConventions, matchWithNames } from "./utils/match";

const initialNaming: NamingConvention = {
  /** Wrapper */
  root: 'wrapper',
  container: 'container',

  /** Pair */
  grid: 'grid',
  cell: 'cell',
  row: 'row',
  col: 'col',
  center: 'center',

  /** Single */
  verticalLayout: 'stack',
  horizontalLayout: 'flex',
  wrap: 'wrap',

  image: 'image',
  space: 'space',
  line: 'line',

  /** Option */
  minWidth: 'min',
  maxWidth: 'max',
};

figma.skipInvisibleInstanceChildren = true;

figma.on('run', async ({ command }: RunEvent) => {
  const currentCollection: VariableCollection | null = await figmaVariables.findCollection(COLLECTION_NAME);

  const overriddenNaming: NamingConvention | null = currentCollection ? await figmaVariables.getNamingVariables(currentCollection) : null;
  const currentNaming: NamingConvention = overriddenNaming || initialNaming;

  const reservedNames = new Set<string>([
    ...Object.values(DEFAULT_NAME),
    ...Object.values(initialNaming),
    ...(overriddenNaming ? Object.values(overriddenNaming) : [])
  ]);

  const targetNodes = collectNodeSetInSelection({ types: ['FRAME', 'RECTANGLE'] });

  switch (command) {
    case 'OVERRIDE_NAMING':
      if (!currentCollection) {
        const newCollection = figmaVariables.createCollection(COLLECTION_NAME);
        figmaVariables.setNamingVariables(newCollection, initialNaming);
        figma.closePlugin('Created a collection in the local variables');
        return;
      }

      if (overriddenNaming && !matchNamingConventions(initialNaming, overriddenNaming)) {
        const diffs = findMissingNamings(initialNaming, overriddenNaming);

        if (diffs) {
          figmaVariables.setNamingVariables(currentCollection, diffs);
          figma.closePlugin('Restored the deleted variables');
          return;
        }
      }

      figma.closePlugin('Already overridden with the local variables');
      return;

    case 'SET_NAMES':
      for (const node of targetNodes) {
        if (matchWithNames(node.name, reservedNames)) {
          node.name = generateName(node, currentNaming) || DEFAULT_NAME[node.type];
        }
      }
      break;

    case 'RESET_NAMES':
      for (const node of targetNodes) {
        if (matchWithNames(node.name, reservedNames)) {
          node.name = DEFAULT_NAME[node.type];
        }
      }
      break;

    case 'RESET_ALL':
      for (const node of targetNodes) {
        node.name = DEFAULT_NAME[node.type];
      }
      break;

    default:
      break;
  }

  figma.closePlugin(targetNodes.size > 0 ? 'Renamed' : 'No frames in your selection');
});
