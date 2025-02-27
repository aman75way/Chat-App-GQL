import MessageContainer from "../components/messages/MessageContainer";
import Sidebar from "../components/sidebar/Sidebar";

const Home = () => {
	return (
		<div className='flex h-[95vh] w-full p-10 border border-slate-500 rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<Sidebar />
			<MessageContainer />
		</div>
	);
};
export default Home;
