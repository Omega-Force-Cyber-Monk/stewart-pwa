const acceptedHeadshotTypes = ["image/jpeg", "image/png", "image/webp"];

export function isAcceptedHeadshotType(file: File) {
  return acceptedHeadshotTypes.includes(file.type);
}
