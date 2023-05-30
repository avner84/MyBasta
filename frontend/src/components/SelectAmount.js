
function SelectAmount(props) {
  const { productAmount, onSelect } = props;
    
      // Handling the change event when selecting the quantity
  const handleChange = (event) => {  
    
     // Calling the onSelect function and passing the selected quantity as an argument
    onSelect(parseInt(event.target.value));
  };
  
  const options = [];
   // Setting the size of the select box based on the product amount
  const selectSize = productAmount < 3 ? 5 : productAmount + 3;
  // Creating the available selection options for the box
  for (let i = 1; i <= selectSize; i++) {
    options.push(
      <option key={i} value={i} >
        {i}
      </option>
    );
  }

    // Rendering the select box with the available options
  return (
    <select className="cartItem__select"  defaultValue={productAmount} onChange={handleChange}>
      {options}
    </select>
  );
}

export default SelectAmount;

// The purpose of the "SelectAmount" component is to allow the user to choose the quantity of products they want to purchase and update the shopping cart accordingly. When the user makes a change in the quantity of the products in the selection box, the "handleChange" function is triggered and updates the selected quantity by calling the "onSelect" function passed as a prop to the component. Thus, the component enables the user to select a specific quantity of products and provides them with the option to add more products than the initially selected quantity.