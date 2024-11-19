export const UserCard = ({username}: {username?: string}) => {


    return (
        <div style={{border: '1px solid black', padding: '5px'}}>
            username: {username ?? "user"}
            <div>password: 123</div>
        </div>
    );
};