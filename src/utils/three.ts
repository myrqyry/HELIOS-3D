import * as THREE from 'three';

/**
 * Converts a direction vector to an Euler rotation that maps the default cone orientation
 * (pointing up along [0, 1, 0]) to the target direction vector.
 */
export function directionToEuler(dir: THREE.Vector3Like): THREE.Euler {
  const v = new THREE.Vector3(dir.x, dir.y, dir.z).normalize();
  const up = new THREE.Vector3(0, 1, 0);
  const q = new THREE.Quaternion().setFromUnitVectors(up, v);
  return new THREE.Euler().setFromQuaternion(q);
}
