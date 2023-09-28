import './App.css';
import { useState } from 'react';

type TFoodData = {
	product_name_pl: string | null;
	'energy-kcal_value': number | null;
};

function App() {
	const [inputValue, setInputValue] = useState('');
	const [productInfo, setProductInfo] = useState<TFoodData[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSearch = async () => {
		try {
			setIsLoading(true);
			const response = await fetch(
				`http://localhost:3000/food-api/findListingByName?name=${inputValue}`
			);

			if (response.ok) {
				const data = await response.json();
				setProductInfo(data);
			} else {
				console.error('Error fetching data:', response.statusText);
				setProductInfo([
					{
						product_name_pl: 'Cannot find product',
						'energy-kcal_value': null,
					},
				]);
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setIsLoading(false);
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
			{isLoading && <div>Loading...</div>}
			{!isLoading && productInfo.length > 0 && (
				<div>
					{productInfo.map((el, index) => (
						<div key={index}>
							<h1>Product Name</h1>
							<p>{el.product_name_pl}</p>
							<h1>Product Calories per 100g</h1>
							<p>{el['energy-kcal_value']} kcal</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default App;
