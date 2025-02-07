import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {



  try {
    
    if (req.headers.authorization) {
      return next(); 
    }

    const { login, senha } = req.body; 

    const loginResponse = await axios.post(`${process.env.BASEURL}autenticacao/token`, {
      login:process.env.USUARIO,
      senha:process.env.SENHA,
    });

    const token = loginResponse.data.accessToken; 

    
    req.headers.authorization = `${token}`;

    //console.log('Token obtido e adicionado ao header:', token);

    next(); 
  } catch (error) {
    //console.error("Erro no login:", error);
    res.status(401).json({ error: "Falha ao autenticar. Verifique as credenciais." });
  }
};
