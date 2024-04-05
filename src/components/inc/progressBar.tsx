
const ProgressBar = ({gotten, all}:{gotten:number, all:number}) => {
  const width = {
    width: `${(gotten/all)*100}%`
  }

  return (
    <div className="w-full h-3 rounded-full bg-primary">
      <div style={width} className="h-full rounded-full bg-green-600"></div>
    </div>
  )
}

export default ProgressBar