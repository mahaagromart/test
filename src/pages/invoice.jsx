import Head from 'next/head';
import Image from 'next/image';
import logo from '../../public/assets/images/img/logo.webp';

export default function InvoicePage() {
    const invoiceDetails = {
        seller: {
            name: "MahaAgroMart",
            address: " 123 Farm Road, Nashik",
            city: "Nashik",
            state: "Maharashtra",
            pin: "422001",
            country: "IN",
            pan: "AAACM1234M",
            gst: "27AAACM1234M1Z5"
        },
        order: {
            number: "405-6342746-5182754",
            date: "October 15, 2023",
            invoiceNumber: "IN-789",
            invoiceDetails: "MH-310565025-2324",
            invoiceDate: "October 15, 2023"
        },
        customer: {
            name: "Rajesh Kumar",
            billingAddress: "123 Farm Lane, Nashik",
            shippingAddress: "456 Harvest Street, Pune",
            city: "Pune",
            state: "Maharashtra",
            pin: "411001",
            stateCode: "27",
            placeOfSupply: "Maharashtra",
            placeOfDelivery: "Maharashtra"
        },
        items: [
            {
                id: 1,
                description: "Organic Wheat Flour (10kg)",
                productCode: "AGR-WH-001",
                unitPrice: 450,
                quantity: 2,
                netAmount: 900,
                taxRate: "5%",
                taxType: "IGST",
                taxAmount: 45,
                totalAmount: 945
            },
            {
                id: 2,
                description: "Organic Wheat Flour (10kg)",
                productCode: "AGR-WH-001",
                unitPrice: 450,
                quantity: 2,
                netAmount: 900,
                taxRate: "5%",
                taxType: "IGST",
                taxAmount: 45,
                totalAmount: 945
            },
            {
                id: 3,
                description: "Organic Wheat Flour (10kg)",
                productCode: "AGR-WH-001",
                unitPrice: 450,
                quantity: 2,
                netAmount: 900,
                taxRate: "5%",
                taxType: "IGST",
                taxAmount: 45,
                totalAmount: 945
            },
            {
                id: 4,
                description: "Organic Wheat Flour (10kg)",
                productCode: "AGR-WH-001",
                unitPrice: 450,
                quantity: 2,
                netAmount: 900,
                taxRate: "5%",
                taxType: "IGST",
                taxAmount: 45,
                totalAmount: 945
            },
        ],
        total: {
            netAmount: 3600,
            taxAmount: 180,
            shippingCharge: 100,
            grandTotal: 3880,
            amountInWords: "Three Thousand Eight Hundred And Eighty only"
        }
    };

    return (
<>
            <Head>
               
                <style>{`
                    /* Print Styles */
                    @media print {
                        body {
                            background: none;
                            margin: 0;
                            padding: 0;
                        }
                        
                        body * {
                            visibility: hidden;
                        }
                        
                        .invoice-container, .invoice-container * {
                            visibility: visible;
                        }
                        
                        .invoice-container {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            margin: 0;
                            padding: 1cm;
                            box-shadow: none;
                        }
                        
                        .print-button {
                            display: none !important;
                        }
                        
                        @page {
                            size: A4;
                            margin: 0;
                        }
                    }
                    
                    /* General Styles */
                    .invoice-container {
                        width: 210mm;
                        min-height: 297mm;
                        margin: 0 auto;
                        background: white;
                        box-shadow: 0 0 10px rgba(0,0,0,0.1);
                        padding: 15px;
                        font-size: 12px;
                        line-height: 1.2;
                    }
                    
                    /* Table Styles */
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        table-layout: fixed;
                    }
                    
                    th, td {
                        border: 1px solid #ddd;
                        padding: 4px;
                        text-align: left;
                        word-wrap: break-word;
                    }
                    
                    th {
                        background-color: #f2f2f2;
                        font-weight: bold;
                    }
                    
                    /* Address Layout */
                    .address-container {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 10px;
                        gap: 10px;
                    }
                    
                    .billing-address,
                    .shipping-address {
                        width: 48%;
                    }
                    
                    /* Compact elements */
                    .compact p {
                        margin: 2px 0;
                    }
                    
                    /* Responsive Styles */
                    @media screen and (max-width: 768px) {
                        .invoice-container {
                            width: 100%;
                            padding: 10px;
                        }
                        
                        .address-container {
                            flex-direction: column;
                        }
                        
                        .billing-address,
                        .shipping-address {
                            width: 100%;
                        }
                        
                        table {
                            font-size: 10px;
                        }
                        
                        th, td {
                            padding: 3px;
                        }
                    }
                    
                    @media screen and (max-width: 480px) {
                        .invoice-container {
                            padding: 5px;
                        }
                        
                        table {
                            display: block;
                            overflow-x: auto;
                        }
                    }
                `}</style>
            </Head>

            <div className="invoice-container">
                {/* Header with logo and invoice title */}
                <div className="flex justify-between items-start mb-2">
                    <div className="w-auto h-24 flex items-center justify-center">
                        <Image
                            src={logo}
                            alt="Company Logo"
                            width={150}
                            height={150}
                            className="object-contain"
                        />
                    </div>

                    <div className="text-right mt-10">
                        <h2 className="text-sm font-bold mb-4">Tax Invoice/Bill of Supply/Cash Memo</h2>
                        <p className="text-xs mb-0">(Original for Recipient)</p>
                    </div>

                </div>

                {/* Seller Information */}
                <div className="mb-2 compact">
                    <p className="font-semibold text-xs mb-1">Sold By:</p>
                    <p className="text-xs mb-0"> {invoiceDetails.seller.name}</p>
                    <p className="text-xs mb-0">
                        <span className="font-bold">C/O</span> {invoiceDetails.seller.address}
                    </p>

                    <p className="text-xs mb-0">{invoiceDetails.seller.city}, {invoiceDetails.seller.state}, {invoiceDetails.seller.pin}</p>
                    <p className="text-xs mb-0">PAN No: {invoiceDetails.seller.pan}</p>
                    <p className="text-xs mb-0">GST Registration No: {invoiceDetails.seller.gst}</p>
                </div>

                {/* Order Information */}
                <div className="mb-2 compact">
                    <p className="text-xs font-bold mb-0">Order Number: {invoiceDetails.order.number}</p>
                    <p className="text-xs mb-0">Order Date: {invoiceDetails.order.date}</p>
                </div>

                {/* Billing and Shipping Address */}
                <div className="address-container mb-2">
                    <div className="billing-address compact">
                        <p className="font-bold text-xs mb-1">Billing Address:</p>
                        <p className="text-xs mb-0">{invoiceDetails.customer.name}</p>
                        <p className="text-xs mb-0">{invoiceDetails.customer.billingAddress}</p>
                        <p className="text-xs mb-0">{invoiceDetails.customer.city}, {invoiceDetails.customer.state}, {invoiceDetails.customer.pin}</p>
                        <p className="text-xs mb-0">State/UT Code: {invoiceDetails.customer.stateCode}</p>
                    </div>
                    <div className="shipping-address compact">
                        <p className="font-bold text-xs mb-1">Shipping Address:</p>
                        <p className="text-xs mb-0">{invoiceDetails.customer.name}</p>
                        <p className="text-xs mb-0">{invoiceDetails.customer.shippingAddress}</p>
                        <p className="text-xs mb-0">{invoiceDetails.customer.city}, {invoiceDetails.customer.state}, {invoiceDetails.customer.pin}</p>
                        <p className="text-xs mb-0">State/UT Code: {invoiceDetails.customer.stateCode}</p>
                        <p className="text-xs mb-0">Place of supply: {invoiceDetails.customer.placeOfSupply}</p>
                        <p className="text-xs mb-0">Place of delivery: {invoiceDetails.customer.placeOfDelivery}</p>
                    </div>
                </div>

                {/* Invoice Details */}
                <div className="mb-2 compact">
                    <p className="text-xs mb-0">Invoice Number: {invoiceDetails.order.invoiceNumber}</p>
                    <p className="text-xs mb-0">Invoice Details: {invoiceDetails.order.invoiceDetails}</p>
                    <p className="text-xs mb-0">Invoice Date: {invoiceDetails.order.invoiceDate}</p>
                </div>

                {/* Items Table */}
                <table className="w-full mb-2">
                    <thead>
                        <tr>
                            <th className="text-xs p-1" style={{ width: '5%' }}>Sl.No</th>
                            <th className="text-xs p-1" style={{ width: '25%' }}>Description</th>
                            <th className="text-xs p-1" style={{ width: '10%' }}>Unit Price</th>
                            <th className="text-xs p-1" style={{ width: '5%' }}>Qty</th>
                            <th className="text-xs p-1" style={{ width: '10%' }}>Net Amount</th>
                            <th className="text-xs p-1" style={{ width: '8%' }}>Tax Rate</th>
                            <th className="text-xs p-1" style={{ width: '8%' }}>Tax Type</th>
                            <th className="text-xs p-1" style={{ width: '10%' }}>Tax Amount</th>
                            <th className="text-xs p-1" style={{ width: '10%' }}>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoiceDetails.items.map((item, index) => (
                            <tr key={item.id}>
                                <td className="text-xs p-1">{index + 1}</td>
                                <td className="text-xs p-1">
                                    {item.description}
                                    <br />
                                    <span className="text-xs text-gray-600">{item.productCode}</span>
                                </td>
                                <td className="text-xs p-1">₹{item.unitPrice.toFixed(2)}</td>
                                <td className="text-xs p-1">{item.quantity}</td>
                                <td className="text-xs p-1">₹{item.netAmount.toFixed(2)}</td>
                                <td className="text-xs p-1">{item.taxRate}</td>
                                <td className="text-xs p-1">{item.taxType}</td>
                                <td className="text-xs p-1">₹{item.taxAmount.toFixed(2)}</td>
                                <td className="text-xs p-1 text-right">₹{item.totalAmount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Total Section */}
                <div className="w-full flex justify-end mb-2">
                    <table className="w-auto text-xs">
                        <tbody>
                            <tr>
                                <td className="p-1">Net Amount:</td>
                                <td className="p-1 text-right">₹{invoiceDetails.total.netAmount.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td className="p-1">Tax Amount:</td>
                                <td className="p-1 text-right">₹{invoiceDetails.total.taxAmount.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td className="p-1">Shipping Charge:</td>
                                <td className="p-1 text-right">₹{invoiceDetails.total.shippingCharge.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td className="p-1 font-bold">GRAND TOTAL:</td>
                                <td className="p-1 font-bold text-right">₹{invoiceDetails.total.grandTotal.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td className="p-1">Amount in Words:</td>
                                <td className="p-1 font-semibold text-right">{invoiceDetails.total.amountInWords}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="compact">
                    <p className="font-bold text-xs mb-1">For {invoiceDetails.seller.name}:</p>
                    <p className="text-xs mb-4">Authorized Signatory</p>
                    <p className="text-xs mb-0">Whether tax is payable under reverse charge - No</p>
                </div>

                <div className="text-xs text-gray-600 mt-2 compact">
                    <p className="mb-0">*This invoice is generated electronically and does not require a physical signature.</p>
                    <p className="mb-0">Please note that this invoice is not a demand for payment.</p>
                    <p className="text-right mb-0">Page 1 of 1</p>
                </div>
            </div>

            {/* Print Button */}
            <div className="max-w-4xl mx-auto mt-6 text-center print-button">
                <button
                    onClick={() => window.print()}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded text-sm"
                >
                    Print Invoice
                </button>
            </div>
        </>
    );
}