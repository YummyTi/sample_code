import {useMutationTemplate} from '../mutation-template';
import {applyCoef, deleteCoef, saveCoef, saveDiffNorm, saveModels} from '.';

export const useSaveDiffNorm = () =>
    useMutationTemplate(saveDiffNorm, 'diff_norm');

export const useSaveModels = () => useMutationTemplate(saveModels, 'diff_norm');

export const useSaveCoef = () => useMutationTemplate(saveCoef, 'coef_list');

export const useDeleteCoef = () => useMutationTemplate(deleteCoef, 'coef_list');

export const useApplyCoef = () => useMutationTemplate(applyCoef, 'coef_list');
