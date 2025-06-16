import type {
  Ref,
  ShallowReactive,
  ShallowRef,
  UnwrapNestedRefs,
  UnwrapRef,
} from 'vue';

import { isReactive, isRef, ref } from 'vue';

import { isObject } from '#/utils/is';

export function useAsync() {
  const loading = ref(false);
  const error = ref(false);
  const finished = ref(false);
  const run = async <T = any>(
    promise: Promise<T>,
    target?:
      | Ref<T>
      | Ref<UnwrapRef<T>>
      | ShallowReactive<T>
      | ShallowRef<T>
      | UnwrapNestedRefs<T>,
    mapper?: (res: any) => T,
  ) => {
    loading.value = true;
    try {
      let data = await promise;
      if (mapper) {
        data = mapper(data) as any;
      }
      if (!target) return data;
      if (isRef(target)) target.value = data;
      else if (isReactive(target) || isObject(target))
        Object.assign(target, data);
      else throw new TypeError('The result type is not supported.');
      return data;
    } catch (error_) {
      error.value = true;
      throw error_;
    } finally {
      loading.value = false;
      finished.value = true;
    }
  };
  return { error, finished, loading, run };
}
