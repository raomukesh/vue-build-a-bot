// The bind & update hooks are by far the most common 
// Shorthand for creating a directive that hooks into both the bind & update hooks
export default function (element, binding){
    Object.keys(binding.value).forEach((position) => {
        element.style[position] = binding.value[position];
    });
    element.style.position = 'absolute';
};





// function applyStyle(element, binding){
//     Object.keys(binding.value).forEach((position) => {
//         element.style[position] = binding.value[position];
//     });
//     element.style.position = 'absolute';
        
//     // element.style.bottom = '5px';
//     // element.style.right = '5px';
// };
// export default {
//     // fires on page load
//     bind: (element, binding) => {
//         applyStyle(element, binding);
//     },
//     //fires when something changed. (Fires before the containing component's chilren are updated)
//     update: (element, binding) => {
//         applyStyle(element, binding);
//     },
//     // inserted : fires when the bound element has been inserted into its parent node.
//     // componentUpdated : like update, fires when the containting component has been updated. (Fires only after all children have been updated).
//     // unbind : which gets called when the directive is unbound from its parent component.
// };