import Link from "next/link"


const DashBoardPage = ({ data }) => {

  return (
    <>
      <h3>Admin: {data}</h3>
      <div className="btn-group">
        <Link href='/'>
          <button className="btn">
            Home Page
          </button>
        </Link>
      </div>
    </>
  )

}

export default DashBoardPage

