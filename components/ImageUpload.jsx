export const ImageUpload = ({id, src, deleteImage}) => {
	return (
		<>
			<div className={"flex-none w-auto h-[200] m-4 group relative z-10"}>
				<div className={"absolute z-20 bottom-1 right-1"}>
					<button onClick={(e) => deleteImage(e, id)} type="button" className="group flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-cyan-700 border border-transparent enabled:hover:bg-cyan-800 focus:ring-cyan-300 dark:bg-cyan-600 dark:enabled:hover:bg-cyan-700 dark:focus:ring-cyan-800 rounded-lg focus:ring-2">
						<span className="flex items-center transition-all duration-200 rounded-md text-sm px-4 py-2">
							<img className="h-6 w-6" src="/assets/icons/trash.svg" alt="Interest Logo"/>
						</span>
					</button>
				</div>
				<img
					src={src}
					alt={"Image"}
					className={"w-full h-full rounded-lg transition-opacity duration-300 ease-in-out group-hover:opacity-90"}
				/>
			</div>
		</>
	)
}