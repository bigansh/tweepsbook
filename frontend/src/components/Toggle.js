const Toggle = ({ id, onChange, checked, disabled, onClick }) => {
	return (
		<label className='switch'>
			<input type='checkbox' checked={checked} onChange={onChange} />
			<span className='slider round'></span>
		</label>
	)
}

export default Toggle
