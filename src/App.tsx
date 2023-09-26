import './App.css';
import { useState } from 'react';
type TFoodData = {
	product_name: string;
	'energy-kcal_100g': number;
};
function App() {
	const [inputValue, setInputValue] = useState('');
	const [productInfo, setProductInfo] = useState<TFoodData>({
		product_name: '',
		'energy-kcal_100g': 0,
	});
	const [isResponse, setIsResponse] = useState<boolean>(false);

	const handleSearch = async () => {
		try {
			const response = await fetch(
				`http://localhost:3000/food-api/findListingByName?name=${inputValue}`
			);

			if (response.ok) {
				const data = await response.json();
				setProductInfo(data);
				setIsResponse(true);
				console.log(productInfo);
			} else {
				console.error('Error fetching data here:', response.statusText);
				setProductInfo({
					product_name: 'cannot find product',
					'energy-kcal_100g': 0,
				});
			}
		} catch (error) {
			console.error('Error fetching data here 2:', error);
		}
	};

	return (
		<div className="App">
			<div>
				<label>
					Enter Product Name:
					<input
						type="text"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>
				</label>
				<button onClick={handleSearch}>Search</button>
			</div>
			{isResponse && (
				<div>
					<h2>Product Name:</h2>
					<p>{productInfo.product_name}</p>
					<h2>Product Calories:</h2>
					<p>{productInfo['energy-kcal_100g']}</p>
				</div>
			)}
		</div>
	);
}

export default App;
