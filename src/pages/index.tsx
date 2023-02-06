import axios from 'axios';
import React, { useState, useEffect } from 'react'
import calculateOutputs from '../util/calculations';
import type { Outputs } from '../util/calculations';
import TextInput from '../components/textInput';
import RangeInput from '../components/rangeInput';
import ButtonGroup from '../components/buttonGroup';
import NumberInput from '../components/numberInput';

export default function Home() {
  const [url, setUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [discountVsAsking, setDiscountVsAsking] = useState(15);
  const [desiredYield, setDesiredYield] = useState(4.5);
  const [convertedRentRate, setConvertedRentRate] = useState(20);
  const [duration, setDuration] = useState(5);
  const [price, setPrice] = useState<null | number>(null);
  const [postCode, setPostcode] = useState(null);
  const [outputs, setOutputs] = useState<null | Outputs>(null);

  useEffect(() => {
    if (!!url.length) {
      handleFetchData();
    }
  }, [url]);

  useEffect(() => {
    if (!!price) {
      const outputs = calculateOutputs(price, discountVsAsking, desiredYield, convertedRentRate, duration);
      setOutputs(outputs);
    }
  }, [price, discountVsAsking, desiredYield, convertedRentRate, duration]);

  const handleFetchData = async () => {
    try {
      const body = JSON.stringify({
        url: url
      });
      const headers = {
        'Content-Type': 'application/json'
      };
      const response = await axios.post('/api/propertyDetails', body, {
        headers: headers
      });

      setPrice(response.data.price);
      setPostcode(response.data.postCode);
      setIsValidUrl(true);
    } catch (e) {
      setIsValidUrl(false);
      setOutputs(null);
      setPrice(null);
      setPostcode(null);
    }
  }

  const formatPrice = (price: number) => {
      return price.toLocaleString('en-GB', {
        style: 'currency',
        currency: 'GBP',
      }).slice(0, -3);
  };

  const setUrlCallback = (value?: string) => {
    if (value) setUrl(value);
  }

  const durationButtonData = [
    { title: "3 years", value : 3},
    { title: "5 years", value: 5 },
    { title: "7 years", value: 7 },
  ];

  const dataRetrievedItems = [
    { title: "Listing price", value: !!price ? formatPrice(price) : "£ _ _ _ , _ _ _" },
    { title: "Post code", value: !!postCode ? postCode : "_ _ _  _ _ _" },
  ];

  const OutputItems = [
    {
      title: "Target price",
      value: !!outputs ? formatPrice(outputs.targetPrice) : "£ _ _ _ , _ _ _",
      subValue: false
    },
    {
      title: "Total monthly rental",
      value: !!outputs ? formatPrice(outputs.totalMonthlyRent) : "£          _ _ _ _",
      subValue: false
    },
    {
      title: "Rent",
      value: !!outputs ? formatPrice(outputs.rent) : "£          _ _ _ _",
      subValue: true
    },
    {
      title: "Converted rent",
      value: !!outputs ? formatPrice(outputs.convertedRent) : "£          _ _ _ _",
      subValue: true
    },
    {
      title: "Future buy-back price",
      value: !!outputs ? formatPrice(outputs.futureBuyBackPrice) : "£ _ _ _ , _ _ _",
      subValue: false
    },
  ]

  return (
    <>
      <div className="xs:hidden md:flex lg:hidden h-screen w-screen justify-center items-center">
        <p className="text-xl text-magenta">
          Not tablet friendly - please use mobile or desktop device.
        </p>
      </div>
      <div className="md:hidden lg:block p-10 mx-auto lg:columns-2 sm:columns-1">
        <div className="lg:h-screen border-dashed xs:border-b-4 lg:border-b-0 lg:border-r-4 border-magenta flex flex-col lg:pr-10 xs:mb-10 lg:mb-0">
          <h2 className="mb-10 font-extrabold text-xl">Inputs</h2>
          <TextInput
            title="Url"
            onChangeCallback={setUrlCallback}
            errorMessage={!isValidUrl ? "Please enter a valid Rightmove url" : undefined}
          />
          <RangeInput
            title="Discount vs asking price" 
            defaultValue={15}
            range={[0, 30]}
            step={1}
            suffix="%"
            onChangeCallback={(value) => setDiscountVsAsking(value)}
          />
          <NumberInput
            title="Desired yield"
            min={4.5}
            max={9}
            defaultValue={4.5}
            suffix="%"
            onChangeCallback={(value) => setDesiredYield(value)}
          />
          <RangeInput
            title="Discount vs asking price"
            defaultValue={20}
            range={[10, 25]}
            step={5}
            suffix="%"
            onChangeCallback={(value) => setConvertedRentRate(value)}
          />
          <ButtonGroup 
            title="Duration"
            value={duration}
            buttons={durationButtonData}
            onClickCallback={(value) => setDuration(value)}
          />
        </div>  
        <div className="lg:h-screen lg:pl-20">
          <h2 className="mb-10 font-extrabold text-xl">Data retrieved</h2>
          {dataRetrievedItems.map(({ title, value }, i) => (
            <div key={i} className="mb-10 grid grid-cols-2 gap-5">
              <p>{title}</p>
              <p className="text-xl">{value}</p>
            </div>
          ))}
          <h2 className="mb-10 font-extrabold text-xl">Outputs</h2>
          {OutputItems.map(({ title, value, subValue }, i) => (
            <div key={i} className={`mb-10 grid grid-cols-2 gap-5`}>
              <p className={`${!!subValue ? "pl-20" : ""}`}>{title}</p>
              <p className="text-xl">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
