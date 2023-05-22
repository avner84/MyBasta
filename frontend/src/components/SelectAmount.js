
function SelectAmount(props) {
  const { productAmount, onSelect } = props;
    
  const handleChange = (event) => {  
    
       
    onSelect(parseInt(event.target.value));
  };
  
  const options = [];
  const selectSize = productAmount < 3 ? 5 : productAmount + 3;
  for (let i = 1; i <= selectSize; i++) {
    options.push(
      <option key={i} value={i} >
        {i}
      </option>
    );
  }

  return (
    <select className="cartItem__select"  defaultValue={productAmount} onChange={handleChange}>
      {options}
    </select>
  );
}

export default SelectAmount;