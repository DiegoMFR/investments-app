import { getCurrencySymbol } from "../utils/utils";
import "./product-totals.css";

interface Props {
    totals: {
        pension: string;
        investment: string;
    };
}

export function ProducTotals({ totals }: Props) {

    return (
        <div className="product-totals">
            <ul>
                {Object.keys(totals).map((key) => (
                    <li key={key}>
                        <div className="total">
                            <h3>{key === 'pension' ? 'Pension Products' : 'Investment Products'}</h3>
                            <div className="amount">
                                <div className="title">Total value</div>
                                <div className="value">{getCurrencySymbol('EUR')}{totals[key as keyof typeof totals]}</div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}