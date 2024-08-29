export async function findVariableCollection(name: string): Promise<VariableCollection | null> {
  const collections = await figma.variables.getLocalVariableCollections();

  return collections.find(collection => collection.name === name) || null;
}
