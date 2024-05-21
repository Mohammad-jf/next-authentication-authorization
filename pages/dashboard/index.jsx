import DashBoardPage from '@/components/templates/DashBoardPage'
import { verifyToken } from '@/utils/auth'


const DashBoard = ({ data }) => {
    return (
        <DashBoardPage data={data} />
    )
}

export default DashBoard


export async function getServerSideProps(context) {
    const { token } = context.req.cookies;
    const secretKey = process.env.SECRET_KEY;
    const tokenVerifyResult = verifyToken(token, secretKey);

    if (!tokenVerifyResult) {
        return {
            redirect: { destination: '/users/signIn', premanant: false }
        }
    }

    return {
        props: {
            data: tokenVerifyResult.email
        }
    }
}