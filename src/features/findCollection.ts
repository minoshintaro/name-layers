export async function findVariableCollection(name: string): Promise<VariableCollection | null> {
  const collections = await figma.variables.getLocalVariableCollections();
  const foundCollection = collections.find(collection => collection.name === name);

  return foundCollection || null;
}
