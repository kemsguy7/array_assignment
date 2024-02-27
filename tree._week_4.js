import FileTree from './fileTree';

export function createFileTree(input) {
  
  const fileTree = new FileTree();
  const parent = input[0];  // Get the parent file at index 0

  // Remove the parent node from the array
  input.splice(0, 1);
  
  // Sort the remaining nodes based on their IDs in ascending order
  input.sort((a, b) => a.id - b.id);
  
  // Re-insert the parent node at the beginning of the array
  input.unshift(parent);

  for (const inputNode of input) {

/* 
    Parent Node Issue:
Parent Node Issue:

The original code assumes that the nodes in the input array are sorted correctly, 
and it directly creates nodes in the fileTree without any specific sorting or manipulation of the input array.
Parent Node Relationship:

The relationship between parent and child nodes is determined by the parentId property.
 However, if the nodes in the input array are not sorted properly, the findNodeById function 
 might not locate the parent node correctly, leading to incorrect parent-child relationships in the file tree.


 Possible Reasons for Failure:
If the input array is not sorted properly, the findNodeById function might not locate the parent node correctly, leading to incorrect parent-child relationships.

The test case, especially the one with the data-for-bug.json dataset, likely expects a specific ordering of nodes in the file tree that was not guaranteed before your modification.


*/




    const parentNode = inputNode.parentId
      ? fileTree.findNodeById(inputNode.parentId)
      : null;

    fileTree.createNode(
      inputNode.id,
      inputNode.name,
      inputNode.type,
      parentNode
    );
  }

  return fileTree;
}