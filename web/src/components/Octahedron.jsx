import { useFrame } from '@react-three/fiber';
import React from "react";
import { useState } from "react";

const Octahedron = () => {
    const octahedron = React.useRef();
    const [blocked, setBlocked] = useState(false);
    useFrame(({ clock }) => {
        if (blocked) return;
        setBlocked(true);
        setTimeout(() => setBlocked(false), 1000 / 60);
        const t = clock.getElapsedTime();
        octahedron.current.rotation.x = t / 2;
        octahedron.current.rotation.y = (t / 2) / 2;
        octahedron.current.rotation.z = (t * 0.8) / 2;
    });

    return (
        <mesh ref={octahedron} scale={0.6}>
            <octahedronGeometry args={[4, 0]} />
            <meshStandardMaterial color="royalblue" />
        </mesh>
    );
};

export default Octahedron;