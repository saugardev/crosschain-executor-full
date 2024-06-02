import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const CONTRACT_ADDRESS = '0x6f26Bf09B1C792e3228e5467807a900A503c0281'; // OP SpookePool
const ABI = [
  "event V3FundsDeposited(address inputToken, address outputToken, uint256 inputAmount, uint256 outputAmount, uint256 indexed destinationChainId, uint32 indexed depositId, uint32 quoteTimestamp, uint32 fillDeadline, uint32 exclusivityDeadline, address indexed depositor, address recipient, address exclusiveRelayer, bytes message)",
  "event FilledV3Relay(address inputToken, address outputToken, uint256 inputAmount, uint256 outputAmount, uint256 repaymentChainId, uint256 indexed originChainId, uint32 indexed depositId, uint32 fillDeadline, uint32 exclusivityDeadline, address exclusiveRelayer, address indexed relayer, address depositor, address recipient, bytes message, (address updatedRecipient, bytes updatedMessage, uint256 updatedOutputAmount, uint8 fillType) relayExecutionInfo)"
];

interface EventData {
  event: string;
  args: {
    inputToken: string;
    outputToken: string;
    inputAmount: ethers.BigNumber;
    outputAmount: ethers.BigNumber;
    depositor: string;
    recipient: string;
    [key: string]: any;
  };
}

const AcrossEventListener: React.FC = () => {
    const [events, setEvents] = useState<EventData[]>([]);

    useEffect(() => {
        const provider = new ethers.providers.JsonRpcProvider('https://optimism.llamarpc.com'); // Ensure correct network
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

        const handleV3FundsDeposited = (inputToken: string, outputToken: string, inputAmount: ethers.BigNumber, outputAmount: ethers.BigNumber, destinationChainId: number, depositId: number, quoteTimestamp: number, fillDeadline: number, exclusivityDeadline: number, depositor: string, recipient: string, exclusiveRelayer: string, message: string) => {
            const event: EventData = {
                event: 'V3FundsDeposited',
                args: { inputToken, outputToken, inputAmount, outputAmount, depositor, recipient, destinationChainId, depositId, quoteTimestamp, fillDeadline, exclusivityDeadline, exclusiveRelayer, message }
            };
            setEvents(prevEvents => [...prevEvents, event]);
        };

        const handleFilledV3Relay = (inputToken: string, outputToken: string, inputAmount: ethers.BigNumber, outputAmount: ethers.BigNumber, repaymentChainId: number, originChainId: number, depositId: number, fillDeadline: number, exclusivityDeadline: number, exclusiveRelayer: string, relayer: string, depositor: string, recipient: string, message: string, relayExecutionInfo: { someField: string }) => {
            const event: EventData = {
                event: 'FilledV3Relay',
                args: { inputToken, outputToken, inputAmount, outputAmount, repaymentChainId, originChainId, depositId, fillDeadline, exclusivityDeadline, exclusiveRelayer, relayer, depositor, recipient, message, relayExecutionInfo }
            };
            setEvents(prevEvents => [...prevEvents, event]);
        };

        contract.on('V3FundsDeposited', handleV3FundsDeposited);
        contract.on('FilledV3Relay', handleFilledV3Relay);

        return () => {
            contract.off('V3FundsDeposited', handleV3FundsDeposited);
            contract.off('FilledV3Relay', handleFilledV3Relay);
        };
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Events Table</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Event Name</th>
                        <th className="py-2">Input Token</th>
                        <th className="py-2">Output Token</th>
                        <th className="py-2">Input Amount</th>
                        <th className="py-2">Output Amount</th>
                        <th className="py-2">Depositor</th>
                        <th className="py-2">Recipient</th>
                        <th className="py-2">Additional Info</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event, index) => (
                        <tr key={index} className="text-center border-t">
                            <td className="py-2">{event.event}</td>
                            <td className="py-2">{event.args.inputToken}</td>
                            <td className="py-2">{event.args.outputToken}</td>
                            <td className="py-2">{event.args.inputAmount.toString()}</td>
                            <td className="py-2">{event.args.outputAmount.toString()}</td>
                            <td className="py-2">{event.args.depositor}</td>
                            <td className="py-2">{event.args.recipient}</td>
                            <td className="py-2">{JSON.stringify(event.args.relayExecutionInfo || {})}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AcrossEventListener;
