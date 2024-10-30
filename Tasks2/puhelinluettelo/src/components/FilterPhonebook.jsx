const FilterPhonebook = ({filterCondition, handleFilter}) => 
    <div>
      Filter phonebook with<input 
        value={filterCondition}
        onChange={handleFilter}/>
    </div>

export default FilterPhonebook