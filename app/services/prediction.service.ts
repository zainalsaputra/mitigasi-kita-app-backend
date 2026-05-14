import createError from 'http-errors';

interface PredictionPayload {
  latitude: number;
  longitude: number;
}

interface ModelServiceResponse {
  status: string;
  message?: string;
  data?: any;
}

const normalizeModelUrl = (url: string) => url.replace(/\/+$/, '');

export const getPredictionFromModel = async (payload: PredictionPayload) => {
  const modelUrl = process.env.MODEL_URL;

  if (!modelUrl) {
    throw createError.InternalServerError('MODEL_URL is not configured');
  }

  let response: Response;

  try {
    response = await fetch(`${normalizeModelUrl(modelUrl)}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw createError.BadGateway('Model service is unreachable');
  }

  let modelResponse: ModelServiceResponse;

  try {
    modelResponse = (await response.json()) as ModelServiceResponse;
  } catch {
    throw createError.BadGateway('Invalid response from model service');
  }

  if (!response.ok || modelResponse.status !== 'success' || !modelResponse.data) {
    throw createError.BadGateway(
      modelResponse.message || 'Failed to fetch prediction from model service',
    );
  }

  return modelResponse.data;
};
