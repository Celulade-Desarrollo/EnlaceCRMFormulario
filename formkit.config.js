import { generateClasses } from '@formkit/themes'

export default {
  config: {
    classes: generateClasses({
      global: {
        label: 'block text-sm font-semibold text-gray-700 px-4 font-bold',
        outer: 'mb-2',
        wrapper: 'w-full',
        help: 'text-xs text-gray-500 mt-1 px-2 ml-4',
        input: 'form-input border border-gray-300 rounded px-3 py-2 w-full focus:outline-none ml-4 mb-2',
        messages: 'text-sm mt-1 px-2 ml-4 text-red-600',
        message: 'text-sm text-red-600',
      },
    }),
  },
}
