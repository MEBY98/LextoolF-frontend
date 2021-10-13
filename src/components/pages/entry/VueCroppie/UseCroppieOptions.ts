import { ref } from 'vue';

export default function UseCroppieOptions() {
  const boundary = ref({ width: 400, height: 400 });
  const viewport = ref({
    width: 300,
    height: 200,
    type: 'square',
  });
  const options = ref({
    format: 'jpeg',
    circle: false,
  });
  return {
    boundary,
    viewport,
    options,
  };
}
