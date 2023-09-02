import { SVGProps } from 'react';

function Deliveroo({ width = 24, height = 24, ...props }: React.PropsWithoutRef<SVGProps<SVGElement>>) {
	return <svg
		{...props}
		xmlns='http://www.w3.org/2000/svg'
		width={width}
		height={height}
		viewBox='0 0 24 24'
	>
		<path fill='currentColor' d='m16.861 0l-1.127 10.584L13.81 1.66L7.777 2.926l1.924 8.922l-8.695 1.822l1.535 7.127L17.832 24l3.498-7.744L22.994.636L16.861 0zM11.39 13.61a.755.755 0 0 1 .322.066c.208.093.56.29.63.592c.103.434.004.799-.312 1.084v.002c-.315.284-.732.258-1.174.113c-.441-.145-.637-.672-.47-1.309c.124-.473.71-.544 1.004-.549zm4.142.548c.447-.012.832.186 1.05.543c.217.357.107.75-.122 1.143h-.002c-.229.392-.83.445-1.422.16c-.399-.193-.397-.684-.353-.983a.922.922 0 0 1 .193-.447c.142-.177.381-.408.656-.416Z' />
	</svg>;
}

export default Deliveroo;