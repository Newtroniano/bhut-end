import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {



  try {
    
    if (req.headers.authorization) {
      return next(); 
    }

    const { login, senha } = req.body; 

    const loginResponse = await axios.post('http://api-test.bhut.com.br:3000/api/v1/autenticacao/token', {
      login:"luis.fidelis",
      senha:"0c314c07-97a3-46d9-978d-244c99ad1e33",
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
