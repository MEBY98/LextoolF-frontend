import { message } from 'ant-design-vue';

type StageTypes = 'created' | 'deleted' | 'edited';
type TypeTypes = 'error' | 'success';

const SUCCES_CREATED = 'creado satisfactoriamente';
const SUCCES_EDITED = 'editado satisfactoriamente';
const SUCCES_DELETED = 'eliminado satisfactoriamente';
const ERROR_ON_CREATED = 'Error al crear';
const ERROR_ON_EDITED = 'Error al editar';
const ERROR_ON_DELETED = 'Error al eliminar';

export default function ShowMessage(
  type: TypeTypes,
  stage: StageTypes,
  say: string,
  extraSay = ''
) {
  if (type === 'success') {
    if (stage === 'created')
      message.success(`${say} ${SUCCES_CREATED}, ${extraSay}`);
    if (stage === 'deleted')
      message.success(`${say} ${SUCCES_DELETED}, ${extraSay}`);
    if (stage === 'edited')
      message.success(`${say} ${SUCCES_EDITED}, ${extraSay}`);
  }
  if (type === 'error') {
    if (stage === 'created')
      message.error(`${ERROR_ON_CREATED} ${say}, ${extraSay}`);
    if (stage === 'deleted')
      message.error(`${ERROR_ON_DELETED} ${say}, ${extraSay}`);
    if (stage === 'edited')
      message.error(`${ERROR_ON_EDITED} ${say}, ${extraSay}`);
  }
}
