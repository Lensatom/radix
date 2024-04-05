import { imageBoxStyle, isSuccesscode } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Text } from "../base";
import ProgressBar from "./progressBar";

type Props = {
  id: string;
  name: string;
  raised: number;
  target: number;
  description: string;
  className?: string
}

const DonateCard = (props:Props) => {
  const {
    id,
    name,
    raised,
    target,
    className,
    description
  } = props
  // const imageQuery = id

  const { data:imageURL } = useQuery({
    queryKey: [`images-${id}`],
    queryFn: async () => {
      const res = await axios.get(`https://pixabay.com/api/?key=43236040-3a44a44b7c1565c5f7a043102&q=${description.length}&image_type=photo`)
      if (isSuccesscode(res.status)) {
        const url = res.data.hits[0].largeImageURL
        return url
      } else {
        return ""
      }
    }
  })

  return (
    <NavLink to={`/donations/${id}`} className={`w-full flex flex-col ${className}`}>
      <div style={imageBoxStyle(imageURL)} className="h-full bg-gray-300 rounded-lg overflow-hidden min-h-44" />
      <div className="flex flex-col p-3 gap-2">
        <Text variant="md" className="font-bold">{name}</Text>
        <ProgressBar gotten={raised || 0} all={target} />
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <Text variant="sm">Amount raised</Text>
            <Text variant="sm" className="font-medium">${raised || 0}</Text>
          </div>
          <div className="flex gap-2 items-center">
            <Text variant="sm">Target:</Text>
            <Text variant="sm" className="font-medium">${target}</Text>
          </div>
        </div>
      </div>
    </NavLink>
  )
}

export default DonateCard