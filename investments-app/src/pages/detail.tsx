import { useParams } from "react-router";

export default function Detail() {

    const {iban} = useParams();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Investment Detail</h1>
            <p >
                This is the detail page for the investment product with IBAN: {iban}
            </p>
        </div>
    );
};