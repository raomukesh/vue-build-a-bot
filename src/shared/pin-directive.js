export default {
    bind: (element, binding) => {
        Object.keys(binding.value).forEach((position) => {
            element.style[position] = binding.value[position];
        });
        element.style.position = 'absolute';
        // element.style.bottom = '5px';
        // element.style.right = '5px';
    },
};