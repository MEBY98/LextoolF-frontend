import { DescriptorType as DescriptorTypeModel } from '@/graphql/modules/DescriptorsTypes/model';
import { Observation as ObservationModel } from '@/graphql/modules/Observation/model';
import { Descriptor as DescriptorModel } from '@/graphql/modules/descriptor/model';
import { store } from '@/store/store';

export default function UseAllDescriptorsInitData() {
  const NoApplyDescriptor = async () => {
    const dataNoApplyDescriptor = await DescriptorModel.getDescriptorByDescription(
      '<No aplica>'
    );
    store.NoApplyDescriptor =
      dataNoApplyDescriptor.data.getDescriptorByDescription;
  };
  const NoDescribeDescriptor = async () => {
    const dataNoDescribeDescriptor = await DescriptorModel.getDescriptorByDescription(
      '<No descrito>'
    );
    store.NoDescribeDescriptor =
      dataNoDescribeDescriptor.data.getDescriptorByDescription;
  };
  const GeneralDescriptionInitData = async () => {
    const dataGeneralDescriptorsType = await DescriptorTypeModel.getAllGeneralDescriptionDescriptorsTypes();
    store.GeneralDescriptionDescriptorsTypes =
      dataGeneralDescriptorsType.data.getDescriptorsTypesByTab;
  };
  const OrderLemmaInitData = async () => {
    const dataOrderLemmaObservations = await ObservationModel.getAllOrderLemmaObservations();
    store.OrderLemmaObservations =
      dataOrderLemmaObservations.data.getObservationsByTab;
  };
  const UseInformationInitData = async () => {
    const dataUseInformationObservations = await ObservationModel.getAllUseInformationObservations();
    store.UseInformationObservations =
      dataUseInformationObservations.data.getObservationsByTab;
  };

  const DefinitionInitData = async () => {
    const dataDefinitionDescriptorsTypes = await DescriptorTypeModel.getAllDefinitionDescriptorsTypes();
    store.DefinitionDescriptorsTypes =
      dataDefinitionDescriptorsTypes.data.getDescriptorsTypesByTab;
  };

  const ContornoInitData = async () => {
    const dataContornoDescriptorsTypes = await DescriptorTypeModel.getAllContornoDescriptorsTypes();
    store.ContornoDescriptorsTypes =
      dataContornoDescriptorsTypes.data.getDescriptorsTypesByTab;
  };

  const ExampleInitData = async () => {
    const dataExampleDescriptorsTypes = await DescriptorTypeModel.getAllExampleDescriptorsTypes();
    store.ExampleDescriptorsTypes =
      dataExampleDescriptorsTypes.data.getDescriptorsTypesByTab;
  };

  const ParadigmaticInfoInitData = async () => {
    const dataParadigmaticInfoDescriptorsTypes = await DescriptorTypeModel.getAllParadigmaticInfoDescriptorsTypes();
    store.ParadigmaticInfoDescriptorsTypes =
      dataParadigmaticInfoDescriptorsTypes.data.getDescriptorsTypesByTab;
  };

  const AllDescriptorsInitData = async () => {
    store.layout.isLoading = true;
    store.layout.loadingTip = 'Cargando descriptores';
    await NoDescribeDescriptor();
    await NoApplyDescriptor();
    await GeneralDescriptionInitData();
    await OrderLemmaInitData();
    await UseInformationInitData();
    await DefinitionInitData();
    await ContornoInitData();
    await ExampleInitData();
    await ParadigmaticInfoInitData();
    store.layout.isLoading = false;
    store.layout.loadingTip = '';
  };
  return {
    NoDescribeDescriptor,
    NoApplyDescriptor,
    GeneralDescriptionInitData,
    OrderLemmaInitData,
    UseInformationInitData,
    DefinitionInitData,
    ContornoInitData,
    ExampleInitData,
    ParadigmaticInfoInitData,
    AllDescriptorsInitData,
  };
}
