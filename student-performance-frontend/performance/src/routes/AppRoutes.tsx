import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Classroom from "@/pages/Classroom";
import Student from "@/pages/Student";
import RegisterStudent from "@/pages/RegisterStudent";
import UpdateStudent from "@/pages/UpdateStudent";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/turma/:id" element={<Classroom />} />
        <Route path="/aluno/:id" element={<Student />} />
        <Route path="/cadastrar-aluno" element={<RegisterStudent />} />
        <Route path="/editar-aluno/:id" element={<UpdateStudent />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
