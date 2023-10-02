export const fetchResponse = async (data: any) => {
  (fetch as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(data),
    })
  );
};
