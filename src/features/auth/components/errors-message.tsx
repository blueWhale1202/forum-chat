type Props = {
    messages: string[];
};

export const ErrorsMessage = ({ messages }: Props) => {
    return (
        <ul className="list-inside list-disc text-sm font-medium text-destructive">
            {messages.map((error, index) => (
                <li key={index}>{error}</li>
            ))}
        </ul>
    );
};
