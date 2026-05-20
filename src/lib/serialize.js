
/**
 * Converts Mongoose documents or arrays of documents into plain JSON objects.
 */
export function serializeData(data) {
  if (!data) return null;

  // Handle arrays
  if (Array.isArray(data)) {
    return data.map(item => serializeDocument(item));
  }

  // Handle single documents
  return serializeDocument(data);
}

function serializeDocument(doc) {
  if (!doc) return null;
  
  // If it's a Mongoose document, convert to plain object
  const obj = typeof doc.toObject === 'function' ? doc.toObject() : doc;

  // Deep clone and clean
  const serialized = JSON.parse(JSON.stringify(obj));

  // Ensure _id is a string if it exists
  if (obj._id) {
    serialized._id = obj._id.toString();
  }

  return serialized;
}
