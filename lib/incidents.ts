export type IncidentType = {
  id: string;
  label: string;
  icon: string;
}

export const incidents: IncidentType[] = [
  { id: 'crash', label: 'Crash', icon: '🚗'},
  { id: 'road_closure', label: 'Road Closure', icon: '🚧'},
  { id: 'pothole', label: 'Pot Hole', icon: '🕳️'},
  { id: 'construction', label: 'In Construction', icon: '🏗️'},
  { id: 'low_visibility', label: 'Low Visibility', icon: '🌫️'},
  { id: 'obstacle', label: 'Obstacle', icon: '⚠️' },
  { id: 'slippery', label: 'Slippery Road', icon: '🌧️' },
  { id: 'stalled', label: 'Stalled Vehicle', icon: '🚗' }
]